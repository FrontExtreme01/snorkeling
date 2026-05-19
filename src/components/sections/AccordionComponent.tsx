import { Accordion, AccordionItem } from "@heroui/react";


const iconPlus = (props: any) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" />
        </svg>
    );
};

export default function AccordionComponent({ title, children }: { title: string, children: React.ReactNode }) {

    const itemClasses = {
        base: "w-full border-b border-zinc-300 shadow-b-sm pb-8",
        title: "text-xl/normal lg:text-3xl/relaxed font-bold",
        trigger: "data-[hover=true]:cursor-pointer rounded-lg h-20 flex items-center",
        indicator: "text-black p-2 md:p-3 rounded-full data-[open=true]:rotate-135",
    };

    return (
        <Accordion
            itemClasses={itemClasses}
            defaultExpandedKeys={[title]}
        >
            <AccordionItem
                key={title}
                aria-label={title}
                title={title}
                indicator={iconPlus}
            >
                {children}
            </AccordionItem>
        </Accordion>
    );
}
