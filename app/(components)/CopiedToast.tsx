import { motion, AnimatePresence } from "framer-motion";

interface AnimatedDivProps {
    isVisible: boolean;
    children: React.ReactNode;
}

const CopiedToast: React.FC<AnimatedDivProps> = ({ isVisible, children }) => {
    return (
        <div className="flex justify-center absolute top-0 left-0 right-0">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, translateY: -20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-green text-base px-7"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CopiedToast;
