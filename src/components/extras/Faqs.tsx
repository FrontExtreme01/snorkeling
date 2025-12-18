import { Accordion, AccordionItem } from "@heroui/react";

interface FaqsProps {
    faqs: Array<{
        question: string;
        answer: string;
    }>;
}
    
const iconSvg = (props: any) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" />
        </svg>
    );
};

export default function Faqs({ faqs }: FaqsProps) {

    const itemClasses = {
        title: "text-base/loose lg:text-lg/loose font-semibold",
        indicator: "data-[open=true]:-rotate-135"
    }

    return (
        <Accordion selectionMode="multiple" variant="splitted" itemClasses={itemClasses}>
            {faqs.map((faq, index) => (
                <AccordionItem
                    key={index}
                    aria-label={faq.question}
                    title={faq.question}
                    indicator={iconSvg}
                    className="rounded-xl mb-3 p-5 shadow border border-zinc-200 text-base/loose"
                >
                    {faq.answer}
                </AccordionItem>
            ))}
        </Accordion>
    );
}
