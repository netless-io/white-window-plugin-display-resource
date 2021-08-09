import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { operableState, pageNumberState } from "../../recoil/State";
import "./style.less";
import classNames from "classnames";

type GotoPageProps = {
    pageCount: number;
};

export const GotoPage: React.FunctionComponent<GotoPageProps> = React.memo(function GotoPage({
    pageCount,
}: GotoPageProps) {
    const [page, setPage] = useRecoilState(pageNumberState);
    const operable = useRecoilValue(operableState);
    const [willGotoPage, setWillGotoPage] = useState<null | number>(null);

    useEffect(() => {
        setWillGotoPage(null);
    }, [page]);

    const gotoPageOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const gotoPage = Number(event.target.value);

        // don't number string
        if (Number.isNaN(gotoPage)) {
            return;
        }

        // empty input value
        if (event.target.value === "") {
            return setWillGotoPage(NaN);
        }

        if (gotoPage < 1 || gotoPage > pageCount) {
            return;
        }

        setWillGotoPage(gotoPage);
    };

    const gotoPageOnSubmit = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter" && isNormalNumber(willGotoPage)) {
            setPage(willGotoPage);
        }
    };

    const pageNumber =
        willGotoPage === null // user don't modify page number input
            ? page
            : Number.isNaN(willGotoPage) // page number input text is empty
            ? ""
            : willGotoPage; // user modify page number

    return (
        <div className="page">
            <input
                type="text"
                className={inputClassName(!operable)}
                onChange={gotoPageOnChange}
                onKeyDown={gotoPageOnSubmit}
                disabled={!operable}
                value={pageNumber}
            />
            <span className="count">{pageCount}</span>
        </div>
    );
});

const isNormalNumber = (value: number | null): value is number => {
    return value !== null && !Number.isNaN(value);
};

const inputClassName = (isDisable: boolean): string => {
    return classNames("goto", {
        disable: isDisable,
    });
};
