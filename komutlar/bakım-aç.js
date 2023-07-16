const Discord = require('discord.js')
const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js')
const { botid } = require('../ayarlar.json')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('bakım-aç')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addStringOption(option =>
        option
            .setName('sebep')
            .setDescription('Bakım sebebini belirtin.')
            .setRequired(true)),
  
    async execute(client, interaction) {   
      
      const YetkiYok = new EmbedBuilder()
      .setDescription(`<:no:1117512106833612883> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
      .setTitle("Hata")
      
    if(interaction.user.id !== "1112637700604960880" && interaction.user.id !== "788717157919096854" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB"){
    return interaction.reply({embeds: [YetkiYok]});
}
      
      const Bakım = db.fetch(`Bakım`)
      const Sebep = db.fetch(`BakımSebep`)
      
      const sebep = interaction.options.getString('sebep');
        
      if(Bakım) {
        
      const BakımAçık = new EmbedBuilder()
      .setDescription(`<:no:1117512106833612883>> **Bot zaten \`${Sebep}\` sebebi ile bakımda.**`)
      .setColor('Red')
      .setTitle("Hata")
      interaction.reply({embeds: [BakımAçık]})
        
      } else {
        
      db.set(`Bakım`, true)
      db.set(`BakımSebep`, sebep)
        
      const BakımAçıldı = new EmbedBuilder()
      .setDescription(`<:yes:1117512041419251752> **Bot \`${sebep}\` sebebi ile bakıma alındı.**`)
      .setColor('Green')
      .setTitle("Başarılı")
      interaction.reply({embeds: [BakımAçıldı]})
      
        }
     }
  }
