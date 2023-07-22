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
             .setTitle("<:onay:1121427062280949911> | İşlem Başarılı.")
             .setDescription(`<:onay:1121427062280949911> | Uptime kanalı başarıyla <#${kanal.id}> olarak ayarlandı.`)
        interaction.reply({embeds: [SistemAçıldı]})
        
        const SistemMesajı = new EmbedBuilder()
             .setColor("Blue")
             .setImage("https://cdn.discordapp.com/attachments/1125828373395017920/1125828419523989627/Adsz.png")
             .setDescription("**Uptime Sistemi | Uptime System** \n")
.addFields({name: "<:Tr:1126168752992550963>", value: "<:icons_book:1125829375699456201> | Gizlilik ve Güvenlik politikamızı destek sunucumuzdan görebilirsin! \n <:dcoloricon_green:1125829143767040061> | Link eklemek için: **Ekle | Add** \n <:coloricon_red:1125829108476166174> | Linkinizi silmek için: **Sil | Delete** \n <:koyumavi:1125829196464259123> | Linklerinizi görmek için: **Liste | List** \n <:help:1125828828040806471> | Aradığınızı bulamadıysanız veya öneriniz varsa sizi destek sunucumuza bekleriz. \n "}, {name: "<:Us:1126168782130380891>", value: "<:icons_book:1125829375699456201> | You can view our Privacy and Security policy on our support server! \n <:dcoloricon_green:1125829143767040061> | To add link: **Ekle | Add** \n <:coloricon_red:1125829108476166174> | To remove your links: **Sil | Delete** \n <:koyumavi:1125829196464259123> | To see your links: **Liste | List** \n <:help:1125828828040806471> | If you didn't find what you were looking for or if you have a suggestion, we welcome you to our support server."})
        
        .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
     
        const Butonlar = new ActionRowBuilder() 
           .addComponents(new Discord.ButtonBuilder()
           .setEmoji("<:dcoloricon_green:1125829143767040061>")
           .setLabel("Ekle")
           .setStyle(ButtonStyle.Success)
           .setCustomId("eklebuton"),
          new Discord.ButtonBuilder()
           .setEmoji("<:coloricon_red:1125829108476166174>")
           .setLabel("Sil")
           .setStyle(ButtonStyle.Danger)
           .setCustomId("silbuton"),
           new Discord.ButtonBuilder()
           .setEmoji("<:koyumavi:1125829196464259123>")
           .setLabel("Liste")
           .setStyle(ButtonStyle.Primary)
           .setCustomId("listebuton"),
           new Discord.ButtonBuilder()        
        .setURL(`https://discord.gg/RT62RZssJm`)
        .setLabel(`Destek sunucusu`)
        .setStyle("Link"))
        
        client.channels.cache.get(kanal.id).send({embeds: [SistemMesajı], components: [Butonlar]})
        
        db.set(`UptimeSistemi_${interaction.guild.id}`, kanal.id)
          
        } else {
           
        const SistemAçık = new EmbedBuilder()
         .setColor("Red")
         .setTitle("<:reddet:1121426474856087632> | İşlem Başarısız.")
         .setDescription(`<:reddet:1121426474856087632> | Uptime sistemi zaten kurulu. Sıfırlamak için: **/uptime-sıfırla**`)
      
        interaction.reply({embeds: [SistemAçık]})
        
         
     }
   }
}