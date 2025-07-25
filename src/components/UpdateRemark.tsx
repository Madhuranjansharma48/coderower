import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const UpdateRemark = () => {
  const [configId, setConfigId] = useState('');
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!configId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a configuration ID",
        variant: "destructive",
      });
      return;
    }

    if (!remark.trim()) {
      toast({
        title: "Error",
        description: "Please enter a remark",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/configurations/${configId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ remark }),
      });

      if (!response.ok) {
        throw new Error('Failed to update configuration');
      }

      const data = await response.json();
      toast({
        title: "Success",
        description: data.message || "Configuration updated successfully",
      });
      
      // Clear form after successful update
      setConfigId('');
      setRemark('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update configuration. Make sure the backend is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Update Remark</CardTitle>
            <CardDescription>
              Update the remark for a specific configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="configId">Configuration ID</Label>
                <Input
                  id="configId"
                  type="text"
                  placeholder="e.g., qwertyuiop"
                  value={configId}
                  onChange={(e) => setConfigId(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="remark">Remark</Label>
                <Textarea
                  id="remark"
                  placeholder="Enter your remark here..."
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  rows={4}
                />
              </div>
              
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Updating..." : "Update Remark"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdateRemark;