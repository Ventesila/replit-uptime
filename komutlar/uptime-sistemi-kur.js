const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true, 
    yetki: 'Administrator',
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('uptime-sistemi-kur')
    .setDescription('Uptime sistemini sunucunuzda ayarlar.')
    .setDMPermission(false)
    .addChannelOption(option =>
        option
            .setName('kanal')
            .setDescription('Uptime sisteminin kurulacağı kanalı belirtin.')
            .setRequired(true)),
  
    async execute(client, interaction) {   
        
      const kanal = interaction.options.getChannel('kanal');
      const Sistem = db.fetch(`UptimeSistemi_${interaction.guild.id}`)
      
      if(!Sistem) {
          
        const SistemAçıldı = new EmbedBuilder()
             .setColor("Green")
             .setDescription(`<✅️> Uptime kanalı başarıyla <#${kanal.id}> olarak ayarlandı.`)
        interaction.reply({embeds: [SistemAçıldı]})
        
        const SistemMesajı = new EmbedBuilder()
             .setColor("Blue")
             .setImage("https://cdn.discordapp.com/attachments/1094660152671604766/1167680262562381824/Adsz.png?ex=654f01fd&is=653c8cfd&hm=1bc3fd288357f45ac826bbaf2d72673e221db1b6af0a0af44021bb6ded0f7c74&")
             .setDescription("**Snaeky** \n")
.addFields({name: "<🛡️> | Gizlilik ve Güvenlik politikamızı destek sunucumuzdan görebilirsin!", value: "\n <✅> | Link eklemek için: **Ekle** \n <❌> | Linkinizi silmek için: **Sil** \n <📎> | Linklerinizi görmek için: **Liste** \n <:Help:> | Aradığınızı bulamadıysanız veya öneriniz varsa sizi destek sunucumuza bekleriz. \n "},)
        
        .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
     
        const Butonlar = new ActionRowBuilder() 
           .addComponents(new Discord.ButtonBuilder()
           .setEmoji("<:Ekle:1132419170596831232>")
           .setLabel("Ekle")
           .setStyle(ButtonStyle.Success)
           .setCustomId("eklebuton"),
          new Discord.ButtonBuilder()
           .setEmoji("<:Sil:1132424813705711747>")
           .setLabel("Sil")
           .setStyle(ButtonStyle.Danger)
           .setCustomId("silbuton"),
           new Discord.ButtonBuilder()
           .setEmoji("<:Liste:1132425047731085333>")
           .setLabel("Liste")
           .setStyle(ButtonStyle.Primary)
           .setCustomId("listebuton"),
           new Discord.ButtonBuilder()  
        .setEmoji("<:YouTube:1112804009414242324>")
       .setURL(`https://www.youtube.com/@SnaekyFOX`)
        .setLabel(`Video`)
        .setStyle("Link"))
        
        client.channels.cache.get(kanal.id).send({embeds: [SistemMesajı], components: [Butonlar]})
        
        db.set(`UptimeSistemi_${interaction.guild.id}`, kanal.id)
          
        } else {
           
        const SistemAçık = new EmbedBuilder()
         .setColor("Red")
         .setDescription(`<:No:1122993152064765973> Uptime sistemi zaten kurulu. Sıfırlamak için **/uptime-sistemi-sıfırla**`)
      
        interaction.reply({embeds: [SistemAçık]})
        
         
     }
   }
}