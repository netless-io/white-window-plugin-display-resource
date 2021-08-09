import { atom } from "recoil";

export const pageNumberState = atom({
    key: "PageNumber",
    default: 1,
});

export const showPreviewListState = atom({
    key: "ShowPreviewList",
    default: false,
});

export const operableState = atom({
    key: "Operable",
    default: false,
});

export const navigationActionState = atom<{
    action: "next" | "prev";
} | null>({
    key: "NavigationAction",
    default: null,
});

export const resourceTypeState = atom<"static" | "dynamic">({
    key: "ResourceType",
    default: "static",
});
