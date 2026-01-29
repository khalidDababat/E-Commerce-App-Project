import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store/Store';
import { setOrderNote } from '../../../Store/features/orderSlice';
import RestaurantContact from './RestaurantContact';
import TextField from '@mui/material/TextField';

const PickupContact = () => {
    const dispatch = useDispatch();
    const note = useSelector((state: RootState) => state.order.note);

    return (
        <div className="contact-fields">
            <RestaurantContact />
            <TextField
                fullWidth
                multiline
                minRows={3}
                placeholder="ملاحظات إضافية للطلب"
                variant="outlined"
                size="small"
                className="field-input"
                value={note}
                onChange={(e) => dispatch(setOrderNote(e.target.value))}
            />
        </div>
    );
};

export default PickupContact;
