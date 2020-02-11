import React, {useState, useEffect} from 'react';
import MUIDataTable from 'mui-datatables';

import EditDeleteCol, {useAddButton} from 'utils/tableButtons';
import { getAll, deleteRow} from './summary1.repo';
import { useDialog } from 'utils/dialog';
import { useAlert } from 'utils/snackbarAlerts';

const defaultColumns = [
    {
        label: 'Id',
        name: 'dewey_summary_id'
    },
    {
        label: "Name",
        name: 'name'
    },
    {
        label: 'Summary Id',
        name: 'summary_id'
    },
]

export default () => {
    const [options, setOptions] = useState({});
    const [columns, setColumns] = useState(defaultColumns);
    const [data, setData] = useState([]);

    const showDialog = useDialog();
    const alert = useAlert();
    const handleEditAdd = () => {};

    const handleYesOnDelete = async rowData => {
        try {
            await deleteRow(rowData.dewey_summary_id);
            await reset();
            alert.success(`Successfully deleted ${rowData.name}`);
        } catch  {
            alert.error(`There was an error deleting ${rowData.name}!`);
        }
    }
    const handleDelete = rowData => {
        const obj = Object.fromEntries(columns.map(({name}, index) => [name,rowData[index]]));
        showDialog({ title: 'Are you sure?', description: `Really delete ${obj.name}?`, handleYes:() => handleYesOnDelete(obj)})
    }
    const addButton = useAddButton(handleEditAdd);

    const reset = async () => {
        setData(await getAll());
    }

    useEffect(() => {
        setOptions({
            selectableRows: 'none',
            ...addButton
        });

        setColumns([
            ...defaultColumns,
            ...EditDeleteCol(() => {}, handleDelete)
        ]);

        (async () => {
            await reset();
        })();

    },[])

    return <>
        <MUIDataTable {...({options, columns, data})}></MUIDataTable>
    </>
}