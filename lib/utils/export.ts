import html2canvas from 'html2canvas';

export async function exportCanvasAsImage(elementId: string, filename: string = 'visualization.png'): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error('Element not found:', elementId);
        return;
    }

    try {
        const canvas = await html2canvas(element, {
            backgroundColor: null,
            scale: 2, // Higher quality
            logging: false,
        });
        
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (error) {
        console.error('Failed to export image:', error);
    }
}

export function downloadJSON(data: any, filename: string = 'data.json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}
