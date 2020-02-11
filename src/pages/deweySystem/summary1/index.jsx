import React, {useState, useEffect} from 'react';
import MUIDataTable from 'mui-datatables';

import EditDeleteCol, {useAddButton} from 'utils/tableButtons';

const defaultColumns = [
    {
        label: "Name",
        name: 'name'
    },
    {
        label: 'summary_id',
        name: 'Summary Id'
    },
]

export default () => {
    const [options, setOptions] = useState({});
    const [columns, setColumns] = useState(defaultColumns);
    const [data, setData] = useState([]);

    const handleEditAdd = () => {};
    const addButton = useAddButton(handleEditAdd);
    
    useEffect(() => {
        setOptions({
            selectableRows: 'none',
            ...addButton
        });

        setColumns([
            ...defaultColumns,
            ...EditDeleteCol(() => {},() => {})
        ]);

    },[])

    return <>
        <MUIDataTable {...({options, columns, data})}></MUIDataTable>
    </>
}