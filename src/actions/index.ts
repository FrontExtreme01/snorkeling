import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";
import { getI18N } from "@/i18n";
import { experimental_AstroContainer } from 'astro/container';

import AdminMailContact from "@/components/email/AdminMailContact.astro";
import UserMailContact from "@/components/email/UserMailContact.astro";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
    mailContactUs: defineAction({
        accept: "form",
        input: z.object({
            fullname: z.string(),
            email: z.string().email(),
            phone: z.string(),
            subject: z.string(),
            message: z.string(),
            lang: z.any(),
        }),
        handler: async (input) => {
            const i18n = getI18N({ currentLocale: input.lang });

            const container = await experimental_AstroContainer.create();
            const subjectAdmin = "Mensaje de contacto - Snorkeling Adventure";
            const subjectUser = i18n.MAILING.CONTACT_US.SUBJECT;

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

            const emailUserHtml = await container.renderToString(UserMailContact,
                {
                    props: {
                        fullName: input.fullname,
                        lang: input.lang
                    }
                }
            );
            // Send email to user
            await resend.emails.send({
                from: "Snorkeling Adventure <snorkelingadventure@sales.whattodoincancun.com>",
                to: input.email,
                subject: subjectUser,
                replyTo: "frontend.extreme@gmail.com",
                html: emailUserHtml,
            });
            // Send email to admin
            const { data, error } = await resend.emails.send({
                from: "Snorkeling Adventure <snorkelingadventure@sales.whattodoincancun.com>",
                to: "frontend.extreme@gmail.com",
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