import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus, Check, Star } from "lucide-react";
import { useCart } from "../cart/CartContext";
import { useI18n } from "@/i18n/I18nProvider";

interface AddToCartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating?: number;
  };
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  open,
  onOpenChange,
  item,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();
  const { t } = useI18n();
  const categoryLabel = t(`menu.category.${item.category}`);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setQuantity(1);
      setNotes("");
      setAddedToCart(false);
    }
  }, [open]);

  const handleAddToCart = () => {
    addItem(item, quantity, notes);
    setAddedToCart(true);

    // Close modal after showing success animation
    setTimeout(() => {
      onOpenChange(false);
    }, 1500);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[540px]">
        {addedToCart ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-primary/10">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              {t("addToCart.successTitle")}
            </h2>
            <p className="text-muted-foreground">{t("addToCart.successBody")}</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("addToCart.title")}</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-2 sm:py-4">
              <div className="-mx-1 overflow-hidden rounded-xl border border-border/50 bg-muted/20 sm:mx-0">
                <div className="aspect-[16/10] w-full max-h-[min(52vh,16rem)] sm:max-h-[min(48vh,18rem)]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground sm:text-xl">{item.name}</h3>
                  <span className="inline-flex rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {categoryLabel}
                  </span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Star className="mr-1 h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                    <span>{(item.rating ?? 4.7).toFixed(1)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                    <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-1">
                      {t("addToCart.tagFresh")}
                    </span>
                    <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-1">
                      {t("addToCart.tagIngredients")}
                    </span>
                    <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-1">
                      {t("addToCart.tagCustomizable")}
                    </span>
                  </div>
                </div>
                <p className="text-lg font-semibold text-primary">
                  R$ {item.price.toFixed(2)}
                </p>
              </div>

              <div className="border-t pt-4">
                <label className="block text-sm font-medium mb-2">
                  {t("addToCart.quantity")}
                </label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-8 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("addToCart.notes")}
                </label>
                <Textarea
                  placeholder={t("addToCart.notesPlaceholder")}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>

              <div className="flex justify-between items-center pt-4 border-t mt-2">
                <span className="font-medium">{t("addToCart.total")}</span>
                <span className="text-lg font-semibold text-primary">
                  R$ {(item.price * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {t("addToCart.cancel")}
              </Button>
              <Button onClick={handleAddToCart}>
                {t("addToCart.confirm")}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
