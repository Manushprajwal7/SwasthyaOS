'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Smartphone, Eye, EyeOff, AlertCircle } from 'lucide-react';

export function SecuritySettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: 'Chrome on Windows', ip: '192.168.1.100', lastActive: 'Now', current: true },
    { id: 2, device: 'Safari on iPhone', ip: '192.168.1.101', lastActive: '2 hours ago', current: false },
  ]);

  return (
    <div className="space-y-4">
      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Update your login password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <div className="flex gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="flex-1 px-3 py-2 border rounded-lg"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-3 py-2 border rounded-lg"
            />
            <p className="text-xs text-muted-foreground mt-1">
              At least 12 characters, include uppercase, numbers, and symbols
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <Button className="bg-primary hover:bg-primary-light">Update Password</Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-success/5 border border-success/20">
            <div>
              <p className="font-medium text-sm">Authenticator App</p>
              <p className="text-xs text-muted-foreground">Google Authenticator</p>
            </div>
            <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
              Enabled
            </span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border">
            <div>
              <p className="font-medium text-sm">SMS Authentication</p>
              <p className="text-xs text-muted-foreground">+91 XXXXX-43210</p>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Backup Codes</p>
            <div className="p-3 bg-slate-50 rounded-lg font-mono text-xs space-y-1">
              <p>1234 5678 9012</p>
              <p>3456 7890 1234</p>
              <p className="text-muted-foreground">+ 8 more codes</p>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Download Backup Codes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Manage devices that have access to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{session.device}</p>
                  {session.current && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{session.ip} • {session.lastActive}</p>
              </div>
              {!session.current && (
                <Button variant="ghost" size="sm" className="text-error">
                  Sign Out
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" className="w-full bg-transparent">
            Sign Out All Other Sessions
          </Button>
        </CardContent>
      </Card>

      {/* Security Keys */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security Keys
          </CardTitle>
          <CardDescription>Manage hardware security keys for account access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Add a hardware security key as an additional authentication method
          </p>
          <Button variant="outline" className="w-full bg-transparent">
            Add Security Key
          </Button>
        </CardContent>
      </Card>

      {/* Login History */}
      <Card>
        <CardHeader>
          <CardTitle>Login History</CardTitle>
          <CardDescription>Recent login activity on your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { time: 'Today, 10:30 AM', device: 'Chrome on Windows', status: 'Success', ip: '192.168.1.100' },
            { time: 'Yesterday, 3:45 PM', device: 'Safari on iPhone', status: 'Success', ip: '192.168.1.101' },
            { time: 'Dec 13, 2024 - 8:15 AM', device: 'Firefox on Linux', status: 'Success', ip: '192.168.1.102' },
          ].map((entry, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 border-b last:border-0 text-sm">
              <div>
                <p className="font-medium">{entry.time}</p>
                <p className="text-xs text-muted-foreground">{entry.device} • {entry.ip}</p>
              </div>
              <span className="text-xs font-medium text-success">{entry.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security Alert */}
      <div className="flex gap-3 p-4 rounded-lg border border-warning/50 bg-warning/5">
        <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-sm">Enable 2FA for maximum security</p>
          <p className="text-xs text-muted-foreground mt-1">
            Two-factor authentication significantly improves your account security
          </p>
        </div>
      </div>
    </div>
  );
}
