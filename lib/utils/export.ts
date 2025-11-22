export function exportCanvasAsImage(elementId: string, filename: string = 'visualization.png') {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error('Element not found');
        return;
    }

    // Use html2canvas if available, otherwise use fallback
    if (typeof window !== 'undefined' && (window as any).html2canvas) {
        (window as any).html2canvas(element).then((canvas: HTMLCanvasElement) => {
            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    } else {
        // Fallback: Create a simple screenshot using canvas API
        console.warn('html2canvas not available, using fallback method');
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
