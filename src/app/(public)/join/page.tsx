'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft,
  Loader2,
  Award
} from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

// Validation schema
const membershipSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Address is required'),
  ward: z.string().min(1, 'Please select your ward'),
  lga: z.string().default('Estako West'),
  topIssues: z.array(z.string()).min(1, 'Please select at least one issue'),
  volunteerInterest: z.array(z.string()).optional(),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: 'You must consent to join the campaign',
  }),
  referralCode: z.string().optional(),
});

type MembershipFormData = z.infer<typeof membershipSchema>;

const wards = [
  'Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5', 'Ward 6',
  'Ward 7', 'Ward 8', 'Ward 9', 'Ward 10', 'Ward 11', 'Ward 12'
];

const topIssues = [
  { id: 'infrastructure', label: 'Infrastructure Development' },
  { id: 'education', label: 'Education & Youth Empowerment' },
  { id: 'healthcare', label: 'Healthcare Access' },
  { id: 'employment', label: 'Job Creation & Employment' },
  { id: 'security', label: 'Security & Safety' },
  { id: 'agriculture', label: 'Agriculture & Food Security' },
  { id: 'water', label: 'Clean Water & Sanitation' },
  { id: 'electricity', label: 'Electricity & Power Supply' },
];

const volunteerOptions = [
  { id: 'canvassing', label: 'Door-to-door Canvassing' },
  { id: 'events', label: 'Event Organization' },
  { id: 'social_media', label: 'Social Media Advocacy' },
  { id: 'phone_banking', label: 'Phone Banking' },
  { id: 'data_entry', label: 'Data Entry & Admin' },
  { id: 'transport', label: 'Transportation Support' },
  { id: 'security', label: 'Event Security' },
  { id: 'medical', label: 'Medical Support' },
];

export default function JoinPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<MembershipFormData>({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      lga: 'Estako West',
      topIssues: [],
      volunteerInterest: [],
      consentGiven: false,
    },
  });

  const watchedTopIssues = watch('topIssues') || [];
  const watchedVolunteerInterest = watch('volunteerInterest') || [];

  const validateStep = async () => {
    let fieldsToValidate: (keyof MembershipFormData)[] = [];
    
    switch (step) {
      case 1:
        fieldsToValidate = ['fullName', 'email', 'phone'];
        break;
      case 2:
        fieldsToValidate = ['address', 'ward'];
        break;
      case 3:
        fieldsToValidate = ['topIssues'];
        break;
      case 4:
        fieldsToValidate = ['consentGiven'];
        break;
    }
    
    const result = await trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep();
    if (isValid && step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: MembershipFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/supporters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setReferralCode(result.supporter?.referralCode || '');
        toast({
          title: 'Welcome to the Movement!',
          description: 'Your registration was successful.',
        });
      } else {
        toast({
          title: 'Registration Failed',
          description: result.error || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-muted/30 pt-20 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-lion-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-lion-green" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4">
                Welcome to the Movement!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for joining Hon. Abdulazeez Izuafa's campaign. 
                Together, we will make a difference in Estako West LGA.
              </p>
              
              {referralCode && (
                <div className="bg-card border border-border rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-lion-gold" />
                    <span className="font-medium">Your Referral Code</span>
                  </div>
                  <code className="text-2xl font-bold text-lion-red">{referralCode}</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Share this code with friends and earn engagement points!
                  </p>
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={() => router.push('/')}
                  className="bg-lion-red hover:bg-lion-red-dark"
                >
                  Return Home
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => router.push('/portal')}
                >
                  Go to Portal
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted/30 pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4">
              Join the <span className="text-lion-red">Movement</span>
            </h1>
            <p className="text-muted-foreground">
              Complete the form below to become a supporter of Hon. Abdulazeez Izuafa's campaign.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-10">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    s <= step
                      ? 'bg-lion-red text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s < step ? <CheckCircle className="h-5 w-5" /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-16 sm:w-24 h-1 mx-2 transition-colors ${
                      s < step ? 'bg-lion-red' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && 'Personal Information'}
                {step === 2 && 'Location Details'}
                {step === 3 && 'Your Priorities'}
                {step === 4 && 'Volunteer & Consent'}
              </CardTitle>
              <CardDescription>
                {step === 1 && 'Tell us about yourself'}
                {step === 2 && 'Where are you located?'}
                {step === 3 && 'What issues matter most to you?'}
                {step === 4 && 'How would you like to help?'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <Label htmlFor="fullName" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          placeholder="Enter your full name"
                          {...register('fullName')}
                          error={errors.fullName?.message}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          {...register('email')}
                          error={errors.email?.message}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+234 800 000 0000"
                          {...register('phone')}
                          error={errors.phone?.message}
                          className="mt-2"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Location */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <Label htmlFor="address" className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Residential Address
                        </Label>
                        <Input
                          id="address"
                          placeholder="Enter your address"
                          {...register('address')}
                          error={errors.address?.message}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="ward">Ward</Label>
                        <select
                          id="ward"
                          {...register('ward')}
                          className="w-full mt-2 h-10 px-3 rounded-md border border-input bg-background"
                        >
                          <option value="">Select your ward</option>
                          {wards.map((ward) => (
                            <option key={ward} value={ward}>
                              {ward}
                            </option>
                          ))}
                        </select>
                        {errors.ward && (
                          <p className="text-sm text-destructive mt-1">{errors.ward.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="lga">LGA</Label>
                        <Input
                          id="lga"
                          {...register('lga')}
                          disabled
                          className="mt-2 bg-muted"
                        />
                      </div>

                      <div>
                        <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                        <Input
                          id="referralCode"
                          placeholder="Enter referral code if you have one"
                          {...register('referralCode')}
                          className="mt-2"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Top Issues */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <Label className="mb-4 block">
                          Select the issues that matter most to you (choose at least one):
                        </Label>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {topIssues.map((issue) => (
                            <label
                              key={issue.id}
                              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                                watchedTopIssues.includes(issue.id)
                                  ? 'border-lion-red bg-lion-red/5'
                                  : 'border-border hover:border-lion-red/50'
                              }`}
                            >
                              <Checkbox
                                checked={watchedTopIssues.includes(issue.id)}
                                onCheckedChange={(checked) => {
                                  const current = watchedTopIssues;
                                  if (checked) {
                                    setValue('topIssues', [...current, issue.id]);
                                  } else {
                                    setValue(
                                      'topIssues',
                                      current.filter((i) => i !== issue.id)
                                    );
                                  }
                                }}
                              />
                              <span className="text-sm">{issue.label}</span>
                            </label>
                          ))}
                        </div>
                        {errors.topIssues && (
                          <p className="text-sm text-destructive mt-2">
                            {errors.topIssues.message}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Volunteer & Consent */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <Label className="mb-4 block">
                          Would you like to volunteer? (Optional):
                        </Label>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {volunteerOptions.map((option) => (
                            <label
                              key={option.id}
                              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                                watchedVolunteerInterest?.includes(option.id)
                                  ? 'border-lion-gold bg-lion-gold/5'
                                  : 'border-border hover:border-lion-gold/50'
                              }`}
                            >
                              <Checkbox
                                checked={watchedVolunteerInterest?.includes(option.id)}
                                onCheckedChange={(checked) => {
                                  const current = watchedVolunteerInterest || [];
                                  if (checked) {
                                    setValue('volunteerInterest', [...current, option.id]);
                                  } else {
                                    setValue(
                                      'volunteerInterest',
                                      current.filter((i) => i !== option.id)
                                    );
                                  }
                                }}
                              />
                              <span className="text-sm">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t">
                        <label className="flex items-start gap-3 p-4 rounded-lg border border-lion-red/30 bg-lion-red/5 cursor-pointer">
                          <Checkbox
                            {...register('consentGiven')}
                            onCheckedChange={(checked) => {
                              setValue('consentGiven', checked as boolean);
                            }}
                          />
                          <div className="text-sm">
                            <p className="font-medium mb-1">Consent to Join</p>
                            <p className="text-muted-foreground">
                              I consent to join the LionCore campaign and receive updates 
                              about campaign activities. I understand that my information 
                              will be used in accordance with the privacy policy.
                            </p>
                          </div>
                        </label>
                        {errors.consentGiven && (
                          <p className="text-sm text-destructive mt-2">
                            {errors.consentGiven.message}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  {step < 4 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-lion-red hover:bg-lion-red-dark"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-lion-red hover:bg-lion-red-dark"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Complete Registration
                          <CheckCircle className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
