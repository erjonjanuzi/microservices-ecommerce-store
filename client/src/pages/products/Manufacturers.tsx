import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Checkbox, CheckboxProps, Divider, Icon, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { useStore } from "../../app/stores/store";

export default observer(function Manufacturers() {
    const {
        productStore: {
            manufacturers, setManufacturers, category
        },
    } = useStore();
    const [manufacturersList, setManufacturersList] = useState<string[]>([]);

    const handleCheckboxClick = (data: CheckboxProps) => {
        if (data.checked) { // @ts-ignore
            const mans = manufacturers;
            // @ts-ignore
            mans.push(data.label)
            setManufacturers(mans);
        }
        else {
            const mans = manufacturers.filter(manufacturer => manufacturer !== data.label)
            setManufacturers(mans);
        }
    }

    useEffect(() => {
        agent.Products.getManufacturersByCategory(category).then(result => {
            setManufacturersList(result);
        })
    }, [category])

    return (
        <>
            <Segment>
                <h4>Filter by manufacturer</h4>
                {manufacturersList.map(manufacturer => {
                    return <div>
                        <Checkbox label={manufacturer} onClick={(_, data) => handleCheckboxClick(data)} />
                        <br /><br />
                    </div>
                })}
            </Segment>
        </>
    )
})