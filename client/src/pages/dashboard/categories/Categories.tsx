import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Grid, Search, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import AddCategoryForm from "./AddCategoryForm";
import CategoriesTable from "./CategoriesTable";

export default observer(function Categories() {
    const {drawerStore} = useStore();

    useEffect(() => {});

    return (
        <>
            <h1>Categories</h1>
            <Segment style={{ backgroundColor: '#1a1c23' }}>
                <Grid>
                    <Grid.Column width={10}>
                        <Search
                            placeholder="Search"
                            showNoResults={false}
                            fluid
                            className="dark-button"
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Button
                            positive
                            icon="plus"
                            content="New category"
                            onClick={() => drawerStore.openDrawer(<AddCategoryForm />, 'Add category')}
                            fluid
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
            <CategoriesTable />
        </>
    )
})