import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const FetchConfig = () => {
  const [configId, setConfigId] = useState('');
  const [result, setResult] = useState<string[][] | null>(null);
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

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/configurations/${configId}`);
      if (!response.ok) {
        throw new Error('Configuration not found');
      }
      const data = await response.json();
      setResult(data);
      toast({
        title: "Success",
        description: "Configuration fetched successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch configuration. Make sure the backend is running.",
        variant: "destructive",
      });
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Fetch Configuration</CardTitle>
            <CardDescription>
              Enter a configuration ID to retrieve the 2D array data
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
              <Button type="submit" disabled={loading}>
                {loading ? "Fetching..." : "Fetch Configuration"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Configuration Result</CardTitle>
              <CardDescription>2D Array for configuration: {configId}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <div className="grid gap-2">
                  {result.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2">
                      {row.map((cell, cellIndex) => (
                        <div
                          key={cellIndex}
                          className="bg-card border border-border p-2 rounded text-center min-w-[80px]"
                        >
                          {cell}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <Label>Raw JSON:</Label>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FetchConfig;