import { createSignal } from "solid-js";

export default function ChartTypeSelection(props) {

    const [checked,setChecked] = createSignal(1);

    const updateData = (value) => {
        props.callback(value)
    }

    return (
        <div class="flex flex-row gap-2">
            <div class="flex  items-center">
                <input 
                    id="default-radio-1" 
                    type="radio" 
                    value={1} 
                    name="default-radio"
                    checked={ checked() === 1 }  
                    onInput={ () => updateData("line") }
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                />
                <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Line 
                </label>
            </div>
            <div class="flex items-center">
                <input 
                    checked={ checked() === 2}  
                    id="default-radio-2" 
                    type="radio" 
                    value={2} 
                    name="default-radio" 
                    onInput={ () => updateData("bar") }
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                />
                <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Bar
                </label>
            </div>
        </div>
    )
}
