const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('link-say')
    .setDescription('Sistemdeki linklerin sayısını gösterir.')
    .setDMPermission(false),
  
    async execute(client, interaction) {  
      
      const Uptime = db.fetch(`UptimeLink_${interaction.user.id}`) || []
      const LinkLimit = db.fetch(`LinkLimit_${interaction.user.id}`) || 0
      let Limit = LinkLimit+3
      const Linkler = db.fetch(`UptimeLink`) || []
      const KişiLinkleri = db.fetch(`UptimeLink_${interaction.user.id}`) || []

      if(!Uptime.length <= 0) {
        
      const SayYok = new EmbedBuilder()
         .setColor("Blurple")
         .setTitle("Erasty Uptime • Proje sayıları")
         .addFields({name: `<:Belge:1122977822051401728> **Sistemdeki toplam projeler**`, value: `> ${Linkler.length}`})
         .addFields({name: `<:Link:1122988494680232077> **Senin toplam projelerin**`, value: `> ${KişiLinkleri.length}`})
         .addFields({name: `<:Premium:1122993100332204146> **Toplam premium üyeler**`, value: `> ${db.fetch(`PremiumSayı`) || 0}`})
         .addFields({name: `<:Limit:1122979156494405723> **Link ekleme hakkın**`, value: `> ${Limit}`})
        
      interaction.reply({embeds: [SayYok]})
      
      } else {
      
      const Say = new EmbedBuilder()
         .setColor("Blurple")
         .setTitle("Erasty Uptime • Proje sayıları")
         .addFields({name: `<:Belge:1122977822051401728> **Sistemdeki toplam projeler**`, value: `> ${Linkler.length}`})
         .addFields({name: `<:Link:1122988494680232077> **Senin toplam projelerin**`, value: `> ${KişiLinkleri.length}`})
         .addFields({name: `<:Premium:1122993100332204146> **Toplam premium üyeler**`, value: `> ${db.fetch(`PremiumSayı`) || 0}`})
         .addFields({name: `<:Limit:1122979156494405723> **Link ekleme hakkın**`, value: `> ${Limit}`})
        
      interaction.reply({embeds: [Say]})
        
        }
    }
}