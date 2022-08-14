const PREFIX = 'CONFIG';

export const SHOW_SUB_HEADER = `${PREFIX}/SHOW_SUB_HEADER`;
export const HIDE_SUB_HEADER = `${PREFIX}/HIDE_SUB_HEADER`;

export const showSubHeader = () => ({ type: SHOW_SUB_HEADER });
export const hideSubHeader = () => ({ type: HIDE_SUB_HEADER });
