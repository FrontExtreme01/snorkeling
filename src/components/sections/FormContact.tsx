import { useState } from "react";
import { actions } from "astro:actions";
import { navigate } from 'astro:transitions/client';
import { ui } from "@/i18n/ui";
import { useTranslatedPath } from '@/i18n/utils';
import { Form, Input, Textarea, Button } from "@heroui/react";

interface FormContactProps {
    lang: keyof typeof ui;
    i18n: {
        LABELS: {
            FULLNAME: string;
            EMAIL: string;
            PHONE: string;
            SUBJECT: string;
            MESSAGE: string;
        },
        PLACEHOLDERS: {
            FULLNAME: string;
            EMAIL: string;
            PHONE: string;
            SUBJECT: string;
            MESSAGE: string;
        },
        ERRORS: {
            FULLNAME: string;
            EMAIL: string;
            PHONE: string;
            SUBJECT: string;
            MESSAGE: string;
        },
        BUTTONS: {
            SEND_MESSAGE: string;
            SENDING: string;
        }
    };
}

export default function FormContact({ i18n, lang }: FormContactProps) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const translatedPath = useTranslatedPath(lang);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.append('lang', lang);

        const { error } = await actions.mailContactUs(formData);
        if (!error)
            navigate(translatedPath("/form-success/"));
        else
            navigate(translatedPath("/form-error/"))

        setIsSubmitting(false);
    };

    return (
        <Form onSubmit={onSubmit}>
            <div className="flex flex-wrap py-5 space-y-8">
                <Input
                    isRequired
                    errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing) {
                            return i18n.ERRORS.FULLNAME;
                        }
                    }}
                    label={i18n.LABELS.FULLNAME}
                    labelPlacement="outside"
                    name="fullname"
                    placeholder={i18n.PLACEHOLDERS.FULLNAME}
                    type="text"
                    size="lg"
                />
                <div className="w-full md:w-1/2 md:pr-2">
                    <Input
                        isRequired
                        errorMessage={({ validationDetails }) => {
                            if (validationDetails.valueMissing) {
                                return i18n.ERRORS.EMAIL;
                            }
                        }}
                        label={i18n.LABELS.EMAIL}
                        labelPlacement="outside"
                        name="email"
                        placeholder={i18n.PLACEHOLDERS.EMAIL}
                        type="email"
                        size="lg"
                    />
                </div>
                <div className="w-full md:w-1/2 md:pl-2">
                    <Input
                        isRequired
                        errorMessage={({ validationDetails }) => {
                            if (validationDetails.valueMissing) {
                                return i18n.ERRORS.PHONE;
                            }
                        }}
                        label={i18n.LABELS.PHONE}
                        labelPlacement="outside"
                        name="phone"
                        placeholder={i18n.PLACEHOLDERS.PHONE}
                        type="number"
                        size="lg"
                    />
                </div>
                <Input
                    isRequired
                    errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing) {
                            return i18n.ERRORS.SUBJECT;
                        }
                    }}
                    label={i18n.LABELS.SUBJECT}
                    labelPlacement="outside"
                    name="subject"
                    placeholder={i18n.PLACEHOLDERS.SUBJECT}
                    type="text"
                    size="lg"
                />
                <Textarea
                    isRequired
                    errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing) {
                            return i18n.ERRORS.MESSAGE;
                        }
                    }}
                    classNames={{
                        input: "resize-y min-h-40",
                    }}
                    label={i18n.LABELS.MESSAGE}
                    labelPlacement="outside"
                    name="message"
                    placeholder={i18n.PLACEHOLDERS.MESSAGE}
                />
            </div>
            <div className="mx-auto mt-5">
                <Button
                    type="submit"
                    radius="full"
                    size="lg"
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                    className="bg-linear-to-br from-sky-700 via-sky-400 to-cyan-500 text-white font-semibold text-base"
                >
                    {isSubmitting ? i18n.BUTTONS.SENDING : i18n.BUTTONS.SEND_MESSAGE}
                </Button>
            </div>
        </Form>

    )
}