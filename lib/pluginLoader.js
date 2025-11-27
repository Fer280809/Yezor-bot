// ============================================
// PLUGIN LOADER - Cargador de Plugins
// ============================================

const fs = require('fs').promises;
const path = require('path');

class PluginLoader {
  constructor() {
    this.plugins = {
      general: [],
      owner: [],
      grupo: []
    };
    
    this.pluginDirs = {
      general: './plugins/',
      owner: './plugins/owner',
      grupo: './plugins/grupo'
    };
  }

  // ============================================
  // CARGAR TODOS LOS PLUGINS
  // ============================================
  async loadAll() {
    console.log('📦 Cargando plugins...');
    
    for (const [type, dir] of Object.entries(this.pluginDirs)) {
      await this.loadFromDirectory(type, dir);
    }

    const total = this.plugins.general.length + 
                  this.plugins.owner.length + 
                  this.plugins.grupo.length;
    
    console.log(`✅ ${total} plugins cargados`);
    console.log(`   - General: ${this.plugins.general.length}`);
    console.log(`   - Owner: ${this.plugins.owner.length}`);
    console.log(`   - Grupo: ${this.plugins.grupo.length}`);
  }

  // ============================================
  // CARGAR DESDE DIRECTORIO
  // ============================================
  async loadFromDirectory(type, dir) {
    try {
      // Crear directorio si no existe
      await fs.mkdir(dir, { recursive: true });
      
      const files = await fs.readdir(dir);
      const jsFiles = files.filter(f => f.endsWith('.js'));

      for (const file of jsFiles) {
        try {
          const filePath = path.join(process.cwd(), dir, file);
          
          // Limpiar caché de require
          delete require.cache[require.resolve(filePath)];
          
          // Cargar plugin
          const plugin = require(filePath);
          
          if (this.validatePlugin(plugin)) {
            this.plugins[type].push({
              name: file.replace('.js', ''),
              path: filePath,
              ...plugin
            });
            
            console.log(`   ✓ ${type}/${file}`);
          } else {
            console.log(`   ✗ ${type}/${file} - Plugin inválido`);
          }
        } catch (error) {
          console.error(`   ✗ Error cargando ${file}:`, error.message);
        }
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`Error leyendo directorio ${dir}:`, error);
      }
    }
  }

  // ============================================
  // VALIDAR PLUGIN
  // ============================================
  validatePlugin(plugin) {
    return (
      plugin &&
      typeof plugin === 'object' &&
      Array.isArray(plugin.cmd) &&
      plugin.cmd.length > 0 &&
      typeof plugin.exec === 'function'
    );
  }

  // ============================================
  // EJECUTAR COMANDO
  // ============================================
  async executeCommand(m, cmd, args, sock, db, settings) {
    const allPlugins = [
      ...this.plugins.general,
      ...this.plugins.owner,
      ...this.plugins.grupo
    ];

    for (const plugin of allPlugins) {
      // Verificar si el comando coincide
      if (plugin.cmd.includes(cmd)) {
        // Verificar permisos
        if (plugin.type === 'owner' && !this.isOwner(m.sender, settings.ownerNumber)) {
          await m.reply('❌ Este comando es solo para el owner');
          return true;
        }

        if (plugin.type === 'grupo' && !m.key.remoteJid.endsWith('@g.us')) {
          await m.reply('❌ Este comando solo funciona en grupos');
          return true;
        }

        // Ejecutar plugin
        try {
          await plugin.exec(m, sock, args, {
            db,
            settings,
            cmd,
            plugins: this
          });
          return true;
        } catch (error) {
          console.error(`Error ejecutando ${plugin.name}:`, error);
          await m.reply(`❌ Error ejecutando comando: ${error.message}`);
          return true;
        }
      }
    }

    return false;
  }

  // ============================================
  // RECARGAR PLUGINS
  // ============================================
  async reload() {
    this.plugins = {
      general: [],
      owner: [],
      grupo: []
    };
    
    await this.loadAll();
  }

  // ============================================
  // RECARGAR PLUGIN ESPECÍFICO
  // ============================================
  async reloadPlugin(name, type = 'general') {
    const dir = this.pluginDirs[type];
    const filePath = path.join(process.cwd(), dir, `${name}.js`);

    try {
      // Limpiar caché
      delete require.cache[require.resolve(filePath)];
      
      // Recargar
      const plugin = require(filePath);
      
      if (this.validatePlugin(plugin)) {
        // Eliminar versión anterior
        this.plugins[type] = this.plugins[type].filter(p => p.name !== name);
        
        // Agregar nueva versión
        this.plugins[type].push({
          name: name,
          path: filePath,
          ...plugin
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(`Error recargando ${name}:`, error);
      return false;
    }
  }

  // ============================================
  // LISTAR PLUGINS
  // ============================================
  listPlugins(type = null) {
    if (type) {
      return this.plugins[type].map(p => ({
        name: p.name,
        commands: p.cmd,
        description: p.description || 'Sin descripción'
      }));
    }

    return {
      general: this.listPlugins('general'),
      owner: this.listPlugins('owner'),
      grupo: this.listPlugins('grupo')
    };
  }

  // ============================================
  // OBTENER PLUGIN
  // ============================================
  getPlugin(name) {
    const allPlugins = [
      ...this.plugins.general,
      ...this.plugins.owner,
      ...this.plugins.grupo
    ];

    return allPlugins.find(p => p.name === name || p.cmd.includes(name));
  }

  // ============================================
  // VERIFICAR SI ES OWNER
  // ============================================
  isOwner(jid, ownerNumber) {
    const number = jid.split('@')[0];
    return number === ownerNumber.replace(/[^\d]/g, '');
  }

  // ============================================
  // OBTENER AYUDA DE COMANDOS
  // ============================================
  getHelp(type = 'all') {
    let help = '';
    
    if (type === 'all' || type === 'general') {
      help += '*📋 COMANDOS GENERALES*\n\n';
      this.plugins.general.forEach(p => {
        help += `• /${p.cmd[0]} - ${p.description || 'Sin descripción'}\n`;
      });
      help += '\n';
    }

    if (type === 'all' || type === 'grupo') {
      help += '*👥 COMANDOS DE GRUPO*\n\n';
      this.plugins.grupo.forEach(p => {
        help += `• /${p.cmd[0]} - ${p.description || 'Sin descripción'}\n`;
      });
      help += '\n';
    }

    if (type === 'all' || type === 'owner') {
      help += '*👑 COMANDOS DE OWNER*\n\n';
      this.plugins.owner.forEach(p => {
        help += `• /${p.cmd[0]} - ${p.description || 'Sin descripción'}\n`;
      });
    }

    return help;
  }

  // ============================================
  // ESTADÍSTICAS
  // ============================================
  getStats() {
    return {
      total: this.plugins.general.length + this.plugins.owner.length + this.plugins.grupo.length,
      general: this.plugins.general.length,
      owner: this.plugins.owner.length,
      grupo: this.plugins.grupo.length,
      commands: this.getAllCommands().length
    };
  }

  // ============================================
  // OBTENER TODOS LOS COMANDOS
  // ============================================
  getAllCommands() {
    const allPlugins = [
      ...this.plugins.general,
      ...this.plugins.owner,
      ...this.plugins.grupo
    ];

    const commands = [];
    allPlugins.forEach(p => {
      commands.push(...p.cmd);
    });

    return commands;
  }
}

module.exports = PluginLoader;