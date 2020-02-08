import React, {useEffect, useState} from 'react';
import MUIDataTable from 'mui-datatables';

import AddUpdate from 'utils/tableButtons';
import { getTeachers, hideTeacher } from './Teacher.repo';
import TeacherModal from './Teacher.modal';
import { useAddButton } from 'utils/tableButtons';
import { useAlert } from 'utils/snackbarAlerts';
import { useDialog } from 'utils/dialog';

const columnConfig = [{
    name: 'teacher_id',
    label: 'Id',
},{
    name: 'first_name',
    label: 'Name',
},{
    name: 'last_name',
    label: 'Surname',
},{
    name: 'mobile',
    label: 'Mobile',
},{
    name: 'Email',
    label: 'Email',
},{
    name: 'is_active',
    label: 'Active',
},{
    name: 'class_id',
    label: 'Class',
}];

const  tableOptions = {
    selectableRows: 'none',
}

export default () => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [teacher, setTeacher] = useState({});
    
    useEffect(() => {
        (async () => {
            let editButtons = await AddUpdate(() => {}, handleDelete);
            const columns = [...columnConfig, ...editButtons];
            setColumns(columns)
            reset();
        })();
    },[]);

    const handleEditAdd = (rowData) => {
		const obj = Object.fromEntries(columns.map(({name}, index) => [name,rowData[index]]));
		setTeacher(obj);
		setIsOpen(true);
	}
    const tableAddButton = useAddButton(handleEditAdd);
    const options = {
        ...tableOptions,
        ...tableAddButton
    }

    const alert = useAlert();
    const dialog = useDialog();

    const handleDelete = rowData => {
		const teacher = Object.fromEntries(columns.map(({name}, index) => [name,rowData[index]]));
		dialog({ title: 'Are you sure?', description: `Really delete ${teacher.first_name} ${teacher.last_name}?`, handleYes: () => handleYesForDelete(teacher) })
	}

    const handleYesForDelete = async teacher => {
        const teacherName = `${teacher.first_name} ${teacher.last_name}`;
        try {
            await hideTeacher(teacher.teacher_id)
            await reset();            
            alert.success(`Successfully removed teacher - ${teacherName}`);
        } catch (error) {
            alert.error(`There was an error removing teacher - ${teacherName}`);
        }
    }

    const handleClose = () => setIsOpen(false);

    const reset = async () => {
        setData(await getTeachers());
        setIsOpen(false);
    }

    return (
        <>
            <MUIDataTable title='Teachers' data={data} columns={columns} options={options} />
            <TeacherModal {...{isOpen,  handleClose, reset, teacher}}></TeacherModal>
        </>
    );
}
