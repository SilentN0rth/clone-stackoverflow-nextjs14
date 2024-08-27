import { Input } from "../ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

export interface ProfileField {
    name: string;
    placeholder: string;
    label: string;
    required?: boolean;
    type?: "text" | "url" | "textarea";
    classes?: string;
    containerClasses?: string;
}

interface ProfileFieldProps extends ProfileField {
    formControl: any;
}

const Field = ({
    formControl,
    name,
    placeholder,
    label,
    required = true,
    type = "text",
    classes,
    containerClasses,
}: ProfileFieldProps) => {
    const inputClasses = `no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border  ${classes}`;
    return (
        <FormField
            control={formControl}
            name={name}
            render={({ field }) => (
                <FormItem className={`space-y-3.5 xl:col-[1/2] ${containerClasses}`}>
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                        {label} {required && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl>
                        {type === "textarea" ? (
                            <Textarea {...field} placeholder={placeholder} className={inputClasses} />
                        ) : type === "url" ? (
                            <Input {...field} placeholder={placeholder} className={inputClasses} type={type} />
                        ) : (
                            <Input {...field} placeholder={placeholder} className={inputClasses} type={type} />
                        )}

                        {/* <Input
                            placeholder={placeholder}
                            className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                            {...field}
                            type={type}
                        /> */}
                    </FormControl>
                    <FormMessage className="animate-pulse text-red-500" />
                </FormItem>
            )}
        />
    );
};

export default Field;
