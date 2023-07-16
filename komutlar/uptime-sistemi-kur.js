const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true, 
    yetki: 'Administrator',
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('uptime-sistemi-kur')
    .setDescription('Sunucuya ait uptime sistemi kurarsınız.')
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
             .setTitle("Başarılı")
             .setDescription(`<:onay:1117512041419251752> **Uptime sistemi <#${kanal.id}> adlı kanalda kuruldu.**`)
        interaction.reply({embeds: [SistemAçıldı]})
        
        const SistemMesajı = new EmbedBuilder()
             .setColor("Blue")
             .setImage("https://cdn.discordapp.com/attachments/1112827440608313434/1114992699351765072/1685905337921_jxqx55_2_1.jpg")
             .setDescription(`         
> <a:hello:1122988976320561322>  Uptime sistemine hoşgeldiniz.
            
> Aşağıdaki \`Ekle\` butonu ile Link ekleyebilirsiniz.

> Aşağıdaki \`Sil\` butonu ile size ait Link(leri) silebilirsiniz.

> Aşağıdaki \`Liste\` butonu ile Linklerinize bakabilirsiniz.

> Diğer komutlarıma erişmek için \`yardım\` komutunu kullanabilirsiniz.
`)
        
    
     
        const Butonlar = new ActionRowBuilder()
           .addComponents(new Discord.ButtonBuilder()
           .setEmoji("<:icons_createchannels:1122987339711516753>")
           .setLabel("Ekle")
           .setStyle(ButtonStyle.Secondary)
           .setCustomId("eklebuton"),
          new Discord.ButtonBuilder()
           .setEmoji("<:kirmizi:1122987402336673792>")
           .setLabel("Sil")
           .setStyle(ButtonStyle.Secondary)
           .setCustomId("silbuton"),
           new Discord.ButtonBuilder()
           .setEmoji("<:icons_link:1122988494680232077>")
           .setLabel("Liste")
           .setStyle(ButtonStyle.Secondary)
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
         .setTitle("Hata")
         .setDescription(`<:reddet:1117512106833612883> **Sistem zaten açık. Sıfırlamak için: </uptime-sistemi-sıfırla:0>**`)
      
        interaction.reply({embeds: [SistemAçık]})
        
         
     }
   }
}