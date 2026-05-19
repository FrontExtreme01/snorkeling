import { defineAction, ActionError } from "astro:actions";
import { z } from 'astro/zod';
import { Resend } from "resend";
import { experimental_AstroContainer } from "astro/container";
import AdminMailContact from "@/components/email/AdminMailContact.astro";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
    mailContactUs: defineAction({
        accept: "form",
        input: z.object({
            fullname: z.string(),
            email: z.email(),
            phone: z.string(),
            subject: z.string(),
            message: z.string(),
            lang: z.any(),
        }),
        handler: async (input) => {

            const container = await experimental_AstroContainer.create();
            const subjectAdmin = "Mensaje de contacto - Snorkeling Adventure";

            const emailAdminHtml = await container.renderToString(AdminMailContact,
                {
                    props: {
                        fullName: input.fullname,
                        phone: input.phone,
                        email: input.email,
                        subject: input.subject,
                        message: input.message
                    },
                }
            );

            // Send email to Reservations Team
            await resend.emails.send({
                from: "Snorkeling Adventure <snorkelingadventure@sales.whattodoincancun.com>",
                to: "reservas@grupo-extreme.com",
                subject: subjectAdmin,
                replyTo: input.email,
                html: emailAdminHtml,
            });
            
            // Send emailto Admin
            const { data, error } = await resend.emails.send({
                from: "Snorkeling Adventure <snorkelingadventure@sales.whattodoincancun.com>",
                to: "info@snorkelingadventure.com",
                subject: subjectAdmin,
                replyTo: input.email,
                html: emailAdminHtml,
            });

            if (error) {
                throw new ActionError({
                    code: "BAD_REQUEST",
                    message: error.message,
                });
            }

            return data;
        },
    })
};