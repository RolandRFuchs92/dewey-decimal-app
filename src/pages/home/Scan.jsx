import React from 'react';

import Modal from 'components/modal';

export default ({open, handleClose}) => {
    return <Modal open={open} handleClose={handleClose}>
        Hello world
    </Modal>
}