import { createSignal } from 'solid-js';



export default function CheckboxGroup(props) {

    const [selectedOptions, setSelectedOptions] = createSignal([]);



    const handleCheckboxChange = (event, optionValue) => {

        const isChecked = event.target.checked;

        if (isChecked) {

            setSelectedOptions([...selectedOptions(), optionValue]);

        } else {

            setSelectedOptions(selectedOptions().filter(v => v !== optionValue));

        }

    };



    return (

        <div class="flex flex-col space-y-2">

            {props.options.map((option) => (

                <div key={option.value} class="flex items-center">

                    <input 

                        type="checkbox"

                        id={option.value}

                        class="h-4 w-4 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500"

                        checked={selectedOptions().includes(option.value)}

                        on:change={(e) => handleCheckboxChange(e, option.value)}

                    />

                    <label for={option.value} class="ml-2 text-gray-700">{option.label}</label>

                </div>

            ))}

        </div>

    );

}
