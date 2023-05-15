import React from 'react';
import {useTranslation} from "react-i18next";

function Index() {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t('route_config.index')}</h1>
            <br/>
            <div>
                <div>{t('my_website')}： <strong>imyuanxiao.com</strong></div>
                <br/>
                <div>Github： <strong>https://github.com/imyuanxiao</strong></div>
            </div>
        </div>
    );
}

export default Index;
