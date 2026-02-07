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
import {
    getAllFeatuers,
    assignFeatureToProduct,
    getFeatguresforProductId,
    removeFeatureFromProduct,
} from '../../api/FeaturesFood';
import { toast } from 'react-toastify';

import { Feature } from '../../../types';
import FeatureListItem from './FeatureListItem';

interface FeatureSelectionModalProps {
    open: boolean;
    onClose: () => void;
    productId: number;
    productName: string;
    onSuccess?: () => void;
}

const useFeatureSelection = (
    productId: number,
    open: boolean,
    onSuccess?: () => void,
    onClose?: () => void
) => {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [initialSelectedIds, setInitialSelectedIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (open) {
            resetState();
            fetchData();
        }
    }, [open, productId]);

    const resetState = () => {
        setSelectedIds([]);
        setInitialSelectedIds([]);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [allFeats, currentFeats] = await Promise.all([
                getAllFeatuers(),
                getFeatguresforProductId(productId.toString()),
            ]);

            setFeatures(allFeats);
            const currentIds = currentFeats.map((f: any) => Number(f.id));
            setSelectedIds(currentIds);
            setInitialSelectedIds(currentIds);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            toast.error('خطأ في تحميل البيانات');
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const toAdd = selectedIds.filter(
                (id) => !initialSelectedIds.includes(id)
            );
            const toRemove = initialSelectedIds.filter(
                (id) => !selectedIds.includes(id)
            );

            await Promise.all([
                ...toAdd.map((id) => assignFeatureToProduct(productId, id)),
                ...toRemove.map((id) =>
                    removeFeatureFromProduct(productId, id)
                ),
            ]);

            toast.success('تم تحديث الإضافات بنجاح');
            onSuccess?.();
            onClose?.();
        } catch (error) {
            console.error('Failed to save features:', error);
            toast.error('خطأ في حفظ الإضافات');
        } finally {
            setSaving(false);
        }
    };

    return {
        features,
        selectedIds,
        loading,
        saving,
        handleToggle,
        handleSave,
    };
};

// --- Main Component ---
const FeatureSelectionModal: React.FC<FeatureSelectionModalProps> = ({
    open,
    onClose,
    productId,
    productName,
    onSuccess,
}) => {
    const { features, selectedIds, loading, saving, handleToggle, handleSave } =
        useFeatureSelection(productId, open, onSuccess, onClose);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ textAlign: 'right', direction: 'rtl' }}>
                <Typography variant="h6" component="span">
                    إضافة إضافات لـ {productName}
                </Typography>
            </DialogTitle>
            <Divider />

            <DialogContent sx={{ minHeight: '200px' }}>
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 5,
                        }}
                    >
                        <CircularProgress size={30} />
                    </Box>
                ) : (
                    <List sx={{ width: '100%', direction: 'rtl' }}>
                        {features.map((feat) => (
                            <FeatureListItem
                                key={feat.id}
                                feature={feat}
                                isSelected={selectedIds.includes(
                                    Number(feat.id)
                                )}
                                onToggle={handleToggle}
                            />
                        ))}

                        {!loading && features.length === 0 && (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                align="center"
                                sx={{ mt: 2 }}
                            >
                                لا توجد إضافات متاحة
                            </Typography>
                        )}
                    </List>
                )}
            </DialogContent>

            <Divider />
            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                <Button onClick={onClose} color="inherit" disabled={saving}>
                    إلغاء
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    disabled={saving || loading}
                    startIcon={
                        saving && <CircularProgress size={16} color="inherit" />
                    }
                >
                    {saving ? 'جاري الحفظ...' : 'حفظ'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FeatureSelectionModal;
