import React, {useState} from 'react';

import Modal from 'components/modal';

export default ({open, handleClose, studentId}) => {

    return <Modal {...{open, handleClose}} >Hello</Modal>
}