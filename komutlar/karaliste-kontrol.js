const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('karaliste-kontrol')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Karaliste bilgisine bakılacak kullanıcıyı belirtin.')
            .setRequired(true)),
              
    async execute(client, interaction) {   
     
       const YetkiYok = new EmbedBuilder()
          .setDescription(`<:no:1117512106833612883> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
          .setColor('Red')
          .setTitle("Hata")
        
      if(interaction.user.id !== "803959818330701875" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB"){
       return interaction.reply({embeds: [YetkiYok]});
}
      
       const kullanıcı = interaction.options.getUser('kullanıcı');

       const Karaliste = db.fetch(`Karaliste_${kullanıcı.id}`)
      
       const KaralistedeVar = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Karalistede")
         .setDescription(`<:no:1117512106833612883> ${kullanıcı} **adlı kullanıcı karalistede bulunuyor, komutları kullanamaz.**`)
      
      const KaralistedeYok = new EmbedBuilder()
         .setColor("Green")
         .setTitle("Karalistede değil")
         .setDescription(`<:yes:1117512041419251752> ${kullanıcı} **adlı kullanıcı karalistede bulunmuyor, komutları kullanabilir.**`)
        
      if(!Karaliste) {
      
      interaction.reply({embeds: [KaralistedeYok]}) 
      
      } else {
      
      interaction.reply({embeds: [KaralistedeVar]}) 
        
        }
    }
}