'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Save, X } from 'lucide-react';

export function UserSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@hospital.in',
    phone: '+91 98765 43210',
    specialization: 'General Practitioner',
    license: 'MED-12345-IN',
    facility: 'Central Hospital, Delhi',
    language: 'English',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Manage your account details</CardDescription>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="gap-2"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Profile Section */}
            <div className="flex items-center gap-4 pb-4 border-b">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                RK
              </div>
              <div>
                <p className="font-semibold">{formData.name}</p>
                <p className="text-sm text-muted-foreground">{formData.specialization}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {[
                { label: 'Full Name', name: 'name', type: 'text' },
                { label: 'Email Address', name: 'email', type: 'email' },
                { label: 'Phone Number', name: 'phone', type: 'tel' },
                { label: 'Specialization', name: 'specialization', type: 'text' },
                { label: 'Medical License', name: 'license', type: 'text' },
                { label: 'Facility', name: 'facility', type: 'text' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg bg-background disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              ))}

              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium mb-1">Preferred Language</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded-lg bg-background disabled:opacity-60"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Regional Language</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-2 pt-4 border-t">
                <Button className="flex-1 bg-primary hover:bg-primary-light gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 gap-2 bg-transparent"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Account Type</span>
            <span className="font-medium">Healthcare Provider</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Account Created</span>
            <span className="font-medium">January 15, 2024</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Last Login</span>
            <span className="font-medium">Today, 10:30 AM</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Verification Status</span>
            <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
              Verified
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
