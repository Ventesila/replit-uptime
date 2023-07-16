const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
  slash: true,                                
  cooldown: 5,                              

    data: new SlashCommandBuilder()         
      .setName('duyuru-ekle')
      .setDescription('Sisteme bir duyuru ekler.')
      .setDMPermission(false)
      .addStringOption(option =>
        option
          .setName('duyuru')
          .setDescription('Eklenecek duyuruyu belirtin.')
          .setRequired(true)),
      
    async execute(client, interaction) {  
      
      const YetkiYok = new EmbedBuilder()
        .setDescription(`**<:no:1117512106833612883> Bu komutu kullanabilmek için \`Bot sahibi\` olmalısın.**`)
        .setColor('Red')
        .setTitle("Olamaz yetkin yok")
      
      if(interaction.user.id !== "1112637700604960880" && interaction.user.id !== "788717157919096854" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB"){
      return interaction.reply({embeds: [YetkiYok]})
      }
      
      const duyuru = interaction.options.getString('duyuru')
        
      const Embed = new EmbedBuilder()
        .setTitle(`Duyuru eklendi`)
        .setDescription(`**<:yes:1117512041419251752> \`${duyuru}\` adlı duyuru sisteme eklendi.**`)
        .setColor("Green")
      interaction.reply({embeds: [Embed]})
       
      db.push(`Duyurular`, `${duyuru}`)
     
  }
}