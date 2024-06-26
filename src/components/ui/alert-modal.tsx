"use client"

import React, {useEffect, useState} from "react";
import {Modal} from "@/components/ui/modal";
import {Button} from "@/components/ui/button";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    description?: string | undefined;
    title: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
                                                          isOpen,
                                                          onClose,
                                                          onConfirm,
                                                          loading,
                                                          description,
                                                          title
                                                      }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Modal
            title={title}
            description={description || ''}
            isOpen={isOpen}
            onClose={onClose}>
            <div className="flex items-center justify-end w-full pt-6 space-x-2">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    Continue
                </Button>
            </div>
        </Modal>
    )
}