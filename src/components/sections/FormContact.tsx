import { useState } from "react";
import { actions } from "astro:actions";
import { Form, Input, Textarea, Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/react";

interface FormContactProps {
    i18n: {
        CLOSE_MODAL: string,
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
        SUCCESS_FORM: {
            TITLE: string;
            DESCRIPTION: string;
        },
        ERROR_FORM: {
            TITLE: string;
            DESCRIPTION: string;
        },
        BUTTONS: {
            SEND_MESSAGE: string;
            SENDING: string;
        }
    };
}

export default function FormContact({ i18n }: FormContactProps) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        const { error } = await actions.mailContactUs(formData);

        if (error) {
            setIsError(true);
        } else {
            setIsError(false);
        }
        setIsSubmitting(false);
        onOpen();
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
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
            {/* Modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="opaque" placement="center" scrollBehavior="inside" size="lg">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {isError ? (
                                    <>
                                        <h2 className="text-2xl font-semibold"> {i18n.ERROR_FORM.TITLE} </h2>
                                        <p className="text-lg/relaxed"> {i18n.ERROR_FORM.DESCRIPTION} </p>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-semibold"> {i18n.SUCCESS_FORM.TITLE} </h2>
                                        <p className="text-lg/relaxed"> {i18n.SUCCESS_FORM.DESCRIPTION} </p>
                                    </>
                                )}
                            </ModalHeader>
                            <ModalBody>
                                <div className="py-4 text-center">
                                    {isError ? (
                                        <svg className="size-24 font-bold text-white bg-linear-to-r from-[#f04040] from-35% to-[#a00000] rounded-full p-5 shadow-md mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="size-24 font-bold text-white bg-linear-to-r from-[#a1d62f] from-35% to-[#81bd00] rounded-full p-5 shadow-md mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l5 5l10 -10" />
                                        </svg>
                                    )}
                                    <h2 className="text-2xl font-semibold my-8">
                                        {isError ? i18n.ERROR_FORM.TITLE : i18n.SUCCESS_FORM.TITLE}
                                    </h2>
                                    <p className="mb-10 text-lg/relaxed">{isError ? i18n.ERROR_FORM.DESCRIPTION : i18n.SUCCESS_FORM.DESCRIPTION}</p>
                                    <button
                                        onClick={() => {
                                            window.location.reload();
                                            onClose();
                                        }}
                                        className="px-8 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-all"
                                    >
                                        {i18n.CLOSE_MODAL}
                                    </button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}