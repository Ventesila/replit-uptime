const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('yeniden-başlat')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false),
              
    async execute(client, interaction) {   
      
      const YetkiYok = new EmbedBuilder()
      .setDescription(`<:No:1117512106833612883> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
      .setTitle("Hata")
        
      if(interaction.user.id !== "1112637700604960880" && interaction.user.id !== "788717157919096854" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB"){
      return interaction.reply({embeds: [YetkiYok]});
}
    
      const Başlatıldı = new EmbedBuilder()
         .setDescription(`<:yes:1122994864049619127> **Bot yeniden başlatılıyor.**`)
         .setColor('Green')
         
      interaction.reply({embeds: [Başlatıldı]})
        
      setTimeout(() => {
      console.log(`Bot Yeniden Başlatılıyor`);
      process.exit(0);
      }, 2000) 
     
   }
}