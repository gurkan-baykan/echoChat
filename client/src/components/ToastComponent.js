import React, { forwardRef, useImperativeHandle } from 'react';

import Toast from 'react-native-toast-message';

const ToastComponent = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    showToast(params) {
      const { type, text } = params;

      Toast.show({
        type: type,
        text1: text,
      });
    },
  }));

  return <Toast topOffset={120} />;
});

export default ToastComponent;
