import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Checkbox,
    CircularProgress,
    Box,
    Typography,
    Divider,
} from '@mui/material';
import { getAllFeatuers, assignFeatureToProduct } from '../../api/FeaturesFood';
import { toast } from 'react-toastify';

interface FeatureSelectionModalProps {
    open: boolean;
    onClose: () => void;
    productId: number;
    productName: string;
    onSuccess?: () => void;
}

const FeatureSelectionModal: React.FC<FeatureSelectionModalProps> = ({
    open,
    onClose,
    productId,
    productName,
    onSuccess,
}) => {
    const [features, setFeatures] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (open) {
            fetchFeatures();
        }
    }, [open]);

    const fetchFeatures = async () => {
        setLoading(true);
        try {
            const data = await getAllFeatuers();
            setFeatures(data);
        } catch (error) {
            console.error('Failed to fetch features:', error);
            toast.error('خطأ في تحميل الإضافات');
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = (id: number) => {
        const currentIndex = selectedIds.indexOf(id);
        const newSelectedIds = [...selectedIds];

        if (currentIndex === -1) {
            newSelectedIds.push(id);
        } else {
            newSelectedIds.splice(currentIndex, 1);
        }

        setSelectedIds(newSelectedIds);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await Promise.all(
                selectedIds.map((featureId) =>
                    assignFeatureToProduct(productId, featureId)
                )
            );
            toast.success('تمت إضافة الإضافات بنجاح');
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to save features:', error);
            toast.error('خطأ في حفظ الإضافات');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ textAlign: 'right', direction: 'rtl' }}>
                <Typography variant="h6" component="span">
                    إضافة إضافات لـ {productName}
                </Typography>
            </DialogTitle>
            <Divider />
            <DialogContent>
                {loading ? (
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center', p: 3 }}
                    >
                        <CircularProgress size={24} />
                    </Box>
                ) : (
                    <List sx={{ width: '100%', direction: 'rtl' }}>
                        {features.map((feat) => {
                            const labelId = `checkbox-list-label-${feat.id}`;
                            return (
                                <ListItem key={feat.id} disablePadding>
                                    <ListItemButton
                                        dense
                                        onClick={() =>
                                            handleToggle(Number(feat.id))
                                        }
                                    >
                                        <Checkbox
                                            edge="start"
                                            checked={
                                                selectedIds.indexOf(
                                                    Number(feat.id)
                                                ) !== -1
                                            }
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                        <ListItemText
                                            id={labelId}
                                            primary={feat.name}
                                            sx={{
                                                textAlign: 'right',
                                                paddingRight: '10px',
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                        {features.length === 0 && !loading && (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                align="center"
                            >
                                لا توجد إضافات متاحة
                            </Typography>
                        )}
                    </List>
                )}
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                <Button onClick={onClose} color="inherit">
                    إلغاء
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    disabled={saving || selectedIds.length === 0}
                >
                    {saving ? <CircularProgress size={24} /> : 'حفظ'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FeatureSelectionModal;
