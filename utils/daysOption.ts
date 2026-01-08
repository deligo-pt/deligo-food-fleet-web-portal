


type TFunction = (key: string) => string;

export const getDaysOptions = (t: TFunction) => {
    return [
        { label: t("last_7_days"), value: "last7days" },
        { label: t("last_14_days"), value: "last14days" },
        { label: t("last_30_days"), value: "last30days" }
    ];
};
