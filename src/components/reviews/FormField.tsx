
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error: boolean;
  errorMessage: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  className?: string;
}

const FormField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  error, 
  errorMessage, 
  required = false, 
  placeholder = '', 
  type = 'text',
  multiline = false,
  className = ''
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {multiline ? (
        <Textarea
          id={id}
          value={value}
          onChange={onChange}
          className={cn(
            "resize-none",
            error ? "border-red-500" : "",
            className
          )}
          placeholder={placeholder}
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={error ? "border-red-500" : ""}
          placeholder={placeholder}
        />
      )}
      
      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 text-sm"
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormField;
