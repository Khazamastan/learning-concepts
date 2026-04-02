import { useEffect, useRef } from 'react';

export function useWhyDidYouUpdate(componentName, props) {
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      const changes = {};
      const previous = previousProps.current;
      const keys = new Set([...Object.keys(previous), ...Object.keys(props)]);

      keys.forEach((key) => {
        if (!Object.is(previous[key], props[key])) {
          changes[key] = {
            from: previous[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changes).length > 0) {
        console.log(`[why-did-you-update] ${componentName}`, changes);
      }
    }

    previousProps.current = props;
  });
}
