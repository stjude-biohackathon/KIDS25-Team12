const ExportService = {
    csvFirstLine(data: Array<any>){
        return 'data:text/csv;charset=utf-8,' + '"' + Object.keys(data[0]).join('","') + '"\n'
    },
    csvEncoding(data: Array<any>){
        let csvData = ''
        for (let i = 0; i < data.length; i++) {
            csvData += '"' + Object.values(data[i]).join('","') + '"\n'
        }
        return csvData
    },
    csvLinkClick(csvData: string, fileNameString: string){
        let encodedUri = encodeURI(csvData)
        let link = document.createElement("a")
        link.setAttribute('href', encodedUri)
        link.setAttribute('download', fileNameString+ '_data_export_' + Date.now() + '.csv')
        link.innerHTML = 'Click Here to download'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link);
    }
}
export { ExportService }