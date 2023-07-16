const Discord = require('discord.js')
const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js')
const { botid } = require('../ayarlar.json')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('bakım-kapat')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false),
  
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
      
      if(!Bakım) {
        
      const BakımKapalı = new EmbedBuilder()
      .setDescription(`<:no:1117512106833612883> **Bot zaten bakımda bulunmuyor.**`)
      .setColor('Red')
      .setTitle("Hata")
      interaction.reply({embeds: [BakımKapalı]})
        
      } else {
        
      db.delete(`Bakım`)
      db.delete(`BakımSebep`)
        
      const BakımKapatıldı = new EmbedBuilder()
      .setDescription(`<:yes:1117512041419251752> **Bot bakımdan çıkartıldı.**`)
      .setColor('Green')
      .setTitle("Başarılı")
      interaction.reply({embeds: [BakımKapatıldı]})
      
        }
     }
  }