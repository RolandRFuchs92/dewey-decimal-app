import PageBase from 'components/page/PageBase';

import repo from './decimal.repo';

const defaultColumns = [
    {
        name: 'dewey_decimal_id',
        label: 'id',
        type: 'text'
    },
    {
        name: 'summary_3_id',
        label: 'Summary 3 Id',
        type: 'select'
    },
    {
        name: 'decimal_id',
        label: 'Decimal Id',
        type: 'textfield'
    },
    {
        name: 'name',
        label: 'Name',
        type: 'textfield'
    },
]

export default () => {
    const {getAll, deleteRow:handleDeleteRow, addOrUpdate: handleEditAddRow} = repo;

    return <PageBase {...{defaultColumns, getAll, handleDeleteRow, handleEditAddRow}}></PageBase>
}