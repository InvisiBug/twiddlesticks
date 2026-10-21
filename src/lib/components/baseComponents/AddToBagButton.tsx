import { useEffect, useRef, useState, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { useContext } from "@/lib/context";
import { addItemToCart } from "@/lib/helpers";
import { Button } from "./Button";

const AddToBagButton = ({ productId, feedbackDurationMs = 1500, preventNavigation, className, onClick, ...buttonProps }: AddToBagButtonProps) => {
  const { cart, setCart } = useContext();
  const [isRecentlyAdded, setIsRecentlyAdded] = useState(false);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) {
        clearTimeout(feedbackTimer.current);
      }
    };
  }, []);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (preventNavigation) {
      event.preventDefault();
    }

    onClick?.(event);

    setCart(addItemToCart(cart, productId));
    setIsRecentlyAdded(true);

    if (feedbackTimer.current) {
      clearTimeout(feedbackTimer.current);
    }

    feedbackTimer.current = setTimeout(() => {
      setIsRecentlyAdded(false);
      feedbackTimer.current = null;
    }, feedbackDurationMs);
  };

  return (
    <Button {...buttonProps} onClick={handleClick} variant="secondary" className={className}>
      {isRecentlyAdded ? "Added to bag" : "Add to bag"}
    </Button>
  );
};

export default AddToBagButton;

type AddToBagButtonProps = {
  productId: number;
  feedbackDurationMs?: number;
  preventNavigation?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;
