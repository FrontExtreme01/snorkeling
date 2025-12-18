import { lazy, Suspense, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";

interface BtnModalBokunProps {
    bookingChannel: string;
    title: string;
    btnBook: string;
    btnCloseText: string;
}

export default function BtnModalBokun({ data }: { data: BtnModalBokunProps }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const LazyLoadBokunScript = lazy(() => import('@/utils/LoadBokunScript'));

    return (
        <>
            <button
                onClick={onOpen}
                className="inline-block w-full md:w-auto bg-linear-to-br from-sky-700 via-sky-400 to-cyan-500 hover:opacity-80 text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-full transition-all cursor-pointer"
            >
                {data.btnBook}
            </button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="opaque" placement="center" scrollBehavior="inside" size="2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{data.title}</ModalHeader>
                            <ModalBody>
                                {isOpen && (
                                    <Suspense fallback={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-loader-quarter animate-spin size-10 mx-auto"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 6l0 -3" /><path d="M6 12l-3 0" /><path d="M7.75 7.75l-2.15 -2.15" /></svg>}>
                                        <LazyLoadBokunScript BookingChannel={data.bookingChannel} />
                                    </Suspense>
                                )}
                                <div className="bokunWidget mb-10 mt-5" data-src={`https://widgets.bokun.io/online-sales/${data.bookingChannel}/experience-calendar/887245`}></div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    {data.btnCloseText}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
