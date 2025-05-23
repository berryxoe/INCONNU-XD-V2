const { GroupParticipantUpdate } = require('@adiwajshing/baileys');

module.exports = async function antiDaveMasisi(bot, message) {
    try {
        const ANTI_DAVE = process.env.ANTI_DAVE_MASISI === 'true';
        if (!ANTI_DAVE || !message || !message.body) return;

        const content = message.body.toLowerCase();

        if (content.includes("dave masisi")) {
            const sender = message.key.participant || message.key.remoteJid;
            const isGroup = message.key.remoteJid.endsWith("@g.us");

            await bot.sendMessage(message.key.remoteJid, {
                delete: {
                    remoteJid: message.key.remoteJid,
                    fromMe: false,
                    id: message.key.id,
                    participant: sender
                }
            });

            await bot.sendMessage(message.key.remoteJid, {
                text: `🚫 *Offensive language detected!* Please refrain from using terms like "Dave masisi".`,
                mentions: [sender]
            });

            if (isGroup && bot.groupParticipantsUpdate) {
                try {
                    await bot.groupParticipantsUpdate(
                        message.key.remoteJid,
                        [sender],
                        "remove"
                    );
                } catch (err) {
                    console.log("❌ Could not remove user:", err.message);
                }
            }
        }

    } catch (err) {
        console.error("❌ Error in antiDaveMasisi.js:", err);
    }
};
